import { Button, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './AgoraForm.module.scss';
import { RoomDataType } from '@app-shared/types';
import { agoraAppId, agoraChannelName, agoraTempToken } from '@app-core/configs';
import { LocalStorageKey } from '@app-shared/enums';

type FormProps = Omit<RoomDataType, 'calling'>;

export const AgoraForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormProps>({
    defaultValues: {
      appId: agoraAppId,
      channel: agoraChannelName,
      token: agoraTempToken
    }
  });

  const onSubmitForm = handleSubmit((event) => {
    const submittedData = {
      ...event,
      calling: true
    };
    localStorage.setItem(LocalStorageKey.SUBMITTED_DATA, JSON.stringify(submittedData));
    navigate(`/room/${event.channel}`);
  });

  return (
    <>
      <form className={styles.formContainer} onSubmit={onSubmitForm}>
        <h4>Hello Homie</h4>
        <TextInput
          placeholder="App ID"
          type="text"
          error={errors.appId?.message}
          {...register('appId', {
            required: {
              value: true,
              message: 'This field is required'
            }
          })}
        />
        <TextInput
          placeholder="Channel Name"
          type="text"
          error={errors.channel?.message}
          {...register('channel', {
            required: {
              value: true,
              message: 'This field is required'
            }
          })}
        />
        <TextInput
          placeholder="Token"
          type="text"
          error={errors.token?.message}
          {...register('token', {
            required: {
              value: true,
              message: 'This field is required'
            }
          })}
        />
        <Button type="submit" color="cyan" disabled={!isValid}>
          Join Room
        </Button>
      </form>
    </>
  );
};
