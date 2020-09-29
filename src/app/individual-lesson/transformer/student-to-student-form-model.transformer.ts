import { StudentFormModel } from '../model/student-form-model.model';
import { Student } from '../model/student.model';

export function transformStudentToStudentFormModule(student: Student): StudentFormModel {
  return {
    fullNameWithEmailAddress: `${student.fullName} (${student.emailAddress})`,
    emailAddress: student.emailAddress
  };
}
