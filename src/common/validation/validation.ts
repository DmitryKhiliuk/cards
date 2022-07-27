const REQUIRED_FIELD = 'Field is required'

export const emailValidation = {
    required: REQUIRED_FIELD,
    validate: (values: string) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) {
            return 'Invalid email address';
        }
        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.length <= 6) {
            return 'The password must contain more six symbols';
        }
        return true;
    }
};