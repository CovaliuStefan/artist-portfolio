import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PortfolioService {
  private filePath = 'src/portfolio.json';

  getAllWorks() {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  addWork(work) {
    const works = this.getAllWorks();
    work.id = uuidv4();
    works.push(work);
    fs.writeFileSync(this.filePath, JSON.stringify(works, null, 2));
    return work;
  }

  updateWork(id, updatedWork) {
    let works = this.getAllWorks();
    works = works.map(work => work.id === id ? { ...work, ...updatedWork } : work);
    fs.writeFileSync(this.filePath, JSON.stringify(works, null, 2));
    return this.getWorkById(id);
  }

  deleteWork(id) {
    let works = this.getAllWorks();
    works = works.filter(work => work.id !== id);
    fs.writeFileSync(this.filePath, JSON.stringify(works, null, 2));
    return { message: `Work with id ${id} deleted` };
  }

  getWorkById(id) {
    const works = this.getAllWorks();
    return works.find(work => work.id === id);
  }
}
