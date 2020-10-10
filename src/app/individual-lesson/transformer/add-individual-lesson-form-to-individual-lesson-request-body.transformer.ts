import { FormGroup } from '@angular/forms';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { IndividualLessonRequestBody } from '../model/individual-lesson-request-body.model';
import { StudentFormModel } from '../model/student-form-model.model';

export function transformAddIndividualLessonFormToIndividualLessonRequestBody(addIndividualLessonForm: FormGroup, studentsAvailableForTutor: StudentFormModel[]): IndividualLessonRequestBody {
  return {
    title: addIndividualLessonForm.get('title').value,
    startDateOfLesson: addIndividualLessonForm.get('lessonDates').get('lessonStartDate').value,
    endDateOfLesson: addIndividualLessonForm.get('lessonDates').get('lessonEndDate').value,
    description: addIndividualLessonForm.get('description').value,
    subdomainName: localStorage.getItem(LocalStorageKeyNames.SubdomainAlias),
    tutorId: localStorage.getItem(LocalStorageKeyNames.UserEmailAddress),
    studentId: getStudentId(addIndividualLessonForm.get('student').value, studentsAvailableForTutor)
  };
}

function getStudentId(studentFormControlValue: string, studentsAvailableForTutor: StudentFormModel[]): string {
  return studentsAvailableForTutor.find(
    availableStudent => availableStudent.fullNameWithEmailAddress === studentFormControlValue).emailAddress;
}
