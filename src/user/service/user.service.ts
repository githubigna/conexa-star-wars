import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { uuid } from 'uuidv4';
import { LoginDto, SignupDto, UpdateUserDto } from '../dto/auth.dtos';
import { User } from '../schemas/user.schema';
import { hash, compare } from 'bcrypt';
@Injectable()
export class UserService {
  //#region Metodos de ruta.
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(userData: SignupDto): Promise<User> {
    const { password, email } = userData;
    const availability = await this.verifyEmailAvailability(email);
    if (!availability) throw new HttpException('Email already taken', 422);
    const plainToHash = await hash(password, Number(process.env.HASH_SALT));
    return this.userRepository.create({
      userId: uuid(),
      userName: userData.name,
      password: plainToHash,
      email: userData.email,
      role: 'Usuario Regular',
    });
  }
  /**
   * @description funcion que busca usuario por id y lo devuelve
   * @param userId string
   * @returns
   */
  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ userId });
  }
  /**
   * @description funcion que lista los usuarios.
   * @param param0 - none
   * @returns Listado de usuarios
   */
  async getUsers({}): Promise<User[]> {
    return this.userRepository.find({});
  }
  /**
   * @description Funcion que actualiza usuario.
   * @param userId string
   * @param userUpdates UpdateUserDto
   * @returns User
   */
  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ userId }, userUpdates);
  }
  /**
   * @description Funcion que loguea y autentica los usuarios.
   * @param userObjectLogin LoginDto
   * @returns User
   */
  async loginUser(userObjectLogin: LoginDto) {
    const { email, password } = userObjectLogin;
    const findUserQuery = await this.userRepository.findOne({ email });
    if (!findUserQuery) throw new HttpException('USER_NOT_FOUND', 401);
    const checkPassword = await compare(password, findUserQuery.password);
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);
    const data = findUserQuery;
    return data;
  }
  //#endregion

  //#region Validaciones

  /**
   * @description Funcion que determina la disponibilidad del email ingresado.
   * @param email email a verificar.
   * @returns booleano determinando si puede usar ese email o no.
   */
  private async verifyEmailAvailability(email: string): Promise<boolean> {
    const findUserQuery = await this.userRepository.findOne({ email });
    if (findUserQuery) return false;
    return true;
  }

  //#endregion
}
