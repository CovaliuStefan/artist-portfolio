import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PortfolioService {
  private filePath = 'src/portfolio.json';
  private uploadsDir = 'uploads';
  private readonly portfolioFilePath = path.join(__dirname, '..', 'portfolio.json');

  private readPortfolio() {
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir);
    }
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const portfolioData = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(portfolioData);
  }

  private writePortfolio(portfolio) {
    fs.writeFileSync(this.filePath, JSON.stringify(portfolio, null, 2));
  }

  getWorksByUser(username: string) {
    const portfolio = this.readPortfolio();
    return portfolio.filter(work => work.username === username);
  }

  getPublicWorks() {
    const portfolio = this.readPortfolio();
    return portfolio.filter(work => work.visibility !== 'hidden');
  }

  getWorkById(id: string) {
    const portfolio = this.readPortfolio();
    return portfolio.find(work => work.id === id);
  }

  addWork(work) {
    const portfolio = this.readPortfolio();
    if(portfolio.length === 0){
      work.id = "1";
    } else {
      work.id = (parseInt(portfolio[portfolio.length-1].id)+1).toString();
    }
    portfolio.push(work);
    this.writePortfolio(portfolio);
    return work;
  }

  updateWork(id: string, updatedWork, username: string) {
    const portfolio = this.readPortfolio();
    const workIndex = portfolio.findIndex(work => work.id === id && work.username === username);
    if (workIndex === -1) throw new Error(`Work not found or unauthorized. Username: ${username}`);

    const existingWork = portfolio[workIndex];

    // Only update fields that are allowed to change
    portfolio[workIndex] = {
      ...existingWork, // Keep the original work data
      title: updatedWork.title,
      description: updatedWork.description,
      clientLink: updatedWork.clientLink,
      visibility: updatedWork.visibility,
    };

    this.writePortfolio(portfolio);
    console.log(portfolio[workIndex]);
    return portfolio[workIndex];
  }

  deleteWork(id: string, username: string) {
    let portfolio = this.readPortfolio();
    const workIndex = portfolio.findIndex(work => work.id === id && work.username === username);
    if (workIndex === -1) throw new Error('Work not found or unauthorized');
    portfolio = portfolio.filter(work => work.id !== id);
    this.writePortfolio(portfolio);
    return { id };
  }
}
