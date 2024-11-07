import { FormHelperText } from '@mui/material';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';
import { Controller, useFormContext } from 'react-hook-form';

type TextCodesProps = MuiOtpInputProps & {
  name: string;
};

export const TextCode = ({ name, ...other }: TextCodesProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{
              error: !!error,
              placeholder: '-',
            }}
            {...other}
          />

          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
};
