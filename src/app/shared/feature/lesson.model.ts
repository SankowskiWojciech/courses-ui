import { FileInformation } from './file/model/file-information.model';

export interface Lesson {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  subdomainAlias: string;
  tutorEmailAddress: string;
  filesInformation: FileInformation[];
}
