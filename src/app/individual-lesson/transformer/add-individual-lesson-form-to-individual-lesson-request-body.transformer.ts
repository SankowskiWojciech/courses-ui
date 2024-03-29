import { FormGroup } from '@angular/forms';
import { LocalStorageKeyNames } from 'src/app/constant/local-storage-key-names.constant';
import { FileInformation } from 'src/app/file/model/file-information.model';
import { IndividualLessonRequestBody } from '../model/individual-lesson-request-body.model';
import { StudentFormModel } from '../model/student-form-model.model';

export function transformAddIndividualLessonFormToIndividualLessonRequestBody(addIndividualLessonForm: FormGroup, studentsAvailableForTutor: StudentFormModel[]): IndividualLessonRequestBody {
  return {
    title: addIndividualLessonForm.get('title').value,
    startDate: addIndividualLessonForm.get('lessonDates').get('lessonStartDate').value,
    endDate: addIndividualLessonForm.get('lessonDates').get('lessonEndDate').value,
    description: addIndividualLessonForm.get('description').value,
    subdomainAlias: localStorage.getItem(LocalStorageKeyNames.SubdomainAlias),
    studentId: getStudentId(addIndividualLessonForm.get('student').value, studentsAvailableForTutor),
    filesIds: getFilesIds(addIndividualLessonForm.get('files').value)
  };
}

function getStudentId(studentFormControlValue: string, studentsAvailableForTutor: StudentFormModel[]): string {
  return studentsAvailableForTutor.find(
    availableStudent => availableStudent.fullNameWithEmailAddress === studentFormControlValue).emailAddress;
}

function getFilesIds(filesInformation: FileInformation[]): string[] {
  if (filesInformation && filesInformation.length) {
    return filesInformation.map(fileInformation => fileInformation.id);
  }
  return null;
}
