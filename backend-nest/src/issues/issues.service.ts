import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from './issue.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepo: Repository<Issue>,
  ) {}

  async findAllForProject(projectId: number): Promise<Issue[]> {
    return this.issuesRepo.find({
      where: { project: { id: projectId } },
    });
  }

  async createIssue(title: string, projectId: number): Promise<Issue> {
    const issue = this.issuesRepo.create({
      title,
      project: { id: projectId },
    });
    return this.issuesRepo.save(issue);
  }
}
