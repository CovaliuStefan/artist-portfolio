import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private filePath = 'src/users.json';
  private readonly usersFilePath = path.join(__dirname, '..', 'users.json');

  private readUsers() {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const usersData = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(usersData);
  }

  private writeUsers(users) {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  }

  register(username: string, password: string) {
    const users = this.readUsers();
    if (users.find(user => user.username === username)) {
      throw new Error('User already exists');
    }
    const newUser = { id: uuidv4(), username, password };
    users.push(newUser);
    this.writeUsers(users);
    return newUser;
  }

  login(username: string, password: string) {
    const users = this.readUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}
