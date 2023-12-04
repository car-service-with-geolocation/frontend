/* eslint-disable react/jsx-curly-brace-presence */
import { SyntheticEvent, useState } from 'react';
import { Helmet } from 'react-helmet';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import ApplicationAcceptPopup from '../../components/Popups/ApplicationAcceptPopup/ApplicationAcceptPopup';
import style from './PasswordReset.module.css';

type Tinputs = {
  pass: string;
  resPass: string;
};

export type TPasswordResetProps = {
  isOpen: boolean;
  onClose: () => void;
  onPopupOpen: () => void;
};

function PasswordReset({ isOpen, onClose, onPopupOpen }: TPasswordResetProps) {
  const [checkPuss, setCheckPuss] = useState(true);
  const [resCheckPuss, setResCheckPuss] = useState(true);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Tinputs>({ mode: 'onChange' });

  function handleCheckPass(event: SyntheticEvent) {
    if (event.currentTarget.id === 'check') {
      setCheckPuss(!checkPuss);
    } else {
      setResCheckPuss(!resCheckPuss);
    }
  }

  const onSubmit: SubmitHandler<Tinputs> = (data) => {
    console.log(data);
    onPopupOpen();
  };

  return (
    <>
      <Helmet>
        <title>Восстановить пароль</title>
        <meta property="og:title" content="Восстановить пароль" />
      </Helmet>
      <main className={style.passwordReset}>
        <h2 className={style.header}>Восстановить пароль</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={style.form}
          action=""
        >
          <fieldset className={style.fieldset}>
            <label htmlFor="password" className={style.label}>
              <span className={style.span}>Пароль</span>
              <div
                className={
                  !errors.pass
                    ? style.inputWrapper
                    : `${style.inputWrapper} ${style.inputWrapperActive}`
                }
              >
                <input
                  className={style.input}
                  type={checkPuss ? 'password' : 'text'}
                  {...register('pass', {
                    required: 'Это поле обязазательно для заполнения',
                    minLength: {
                      value: 8,
                      message: `Текст должен быть не короче 8 символов `,
                    },
                    maxLength: {
                      value: 16,
                      message: `Текст должен быть не длинее 16 символов `,
                    },
                  })}
                  id="password"
                />
                <button
                  type="button"
                  id="check"
                  onClick={handleCheckPass}
                  className={
                    checkPuss
                      ? style.checkPassButton
                      : `${style.checkPassButtonActive} ${style.checkPassButton}`
                  }
                />
              </div>
              <span className={style.errorSpan}>
                {errors.pass ? errors.pass.message : ''}
              </span>
            </label>
            <label htmlFor="resPassword" className={style.label}>
              <span className={style.span}>Повторите пароль</span>
              <div
                className={
                  !errors.resPass
                    ? style.inputWrapper
                    : `${style.inputWrapper} ${style.inputWrapperActive}`
                }
              >
                <input
                  className={style.input}
                  type={resCheckPuss ? 'password' : 'text'}
                  {...register('resPass', {
                    required: 'Это поле обязазательно для заполнения',
                    minLength: {
                      value: 8,
                      message: `Текст должен быть не короче 8 символов `,
                    },
                    maxLength: {
                      value: 16,
                      message: `Текст должен быть не длинее 16 символов `,
                    },
                    // eslint-disable-next-line consistent-return
                    validate: (value: string) => {
                      if (watch('pass') !== value) {
                        return 'Пароли не совпадают';
                      }
                    },
                  })}
                  id="resPassword"
                  autoComplete="off"
                />
                <button
                  type="button"
                  id="Rescheck"
                  onClick={handleCheckPass}
                  className={
                    resCheckPuss
                      ? style.checkPassButton
                      : `${style.checkPassButton} ${style.checkPassButtonActive}`
                  }
                />
              </div>
              <span className={style.errorSpan}>{errors.resPass?.message}</span>
            </label>
            <button
              className={
                isValid ? style.submit : `${style.submit} ${style.submitDisable}`
              }
              type="submit"
              // eslint-disable-next-line no-unneeded-ternary
            >
              Сохранить
            </button>
          </fieldset>
        </form>
        <div className={style.linkWrapper}>
          <p className={style.subTitle}>Помните свой пароль?</p>
          <Link className={style.link} to={'/signin'}>
            Войти
          </Link>
        </div>
      </main>
      <ApplicationAcceptPopup isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default PasswordReset;
