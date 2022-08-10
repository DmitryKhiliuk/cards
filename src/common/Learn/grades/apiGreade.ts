import {instance} from "../../instance/instance";

export type UpdatedGradeValueType = {
    card_id: string,
    grade: number
};

export type UpdateGradeResponseType = {
    updatedGrade: UpdatedGradeType;
    token: string;
    tokenDeathTime: number;
};

export type UpdatedGradeType = {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    more_id: string;
    created: string;
    updated: string;
    grade: number;
    shots: number;
    __v: number;
};

export const gradeAPI = {
    updateGrade(data: UpdatedGradeValueType) {
        return instance.put<UpdateGradeResponseType>('cards/grade', data);
    },
};