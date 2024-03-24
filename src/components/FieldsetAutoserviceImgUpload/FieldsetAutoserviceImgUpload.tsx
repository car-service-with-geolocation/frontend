import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { MAX_FILE_SIZE } from '../../utils/constants';
import styles from './styles/styles.module.css';

function FieldsetAutoserviceImgUpload() {
  const { register, setValue, watch } = useFormContext();
  const [errMsg, setErrMsg] = useState('');

  const files: File[] = watch('autoservice_img');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newArr = [...files, ...acceptedFiles];
      const noDuplicate = newArr.reduce((acc: File[], file) => {
        const isCopy: boolean = !!acc.find((v) => {
          return v.name === file.name;
        });
        if (isCopy) {
          return acc;
        }
        return [...acc, file];
      }, []);
      if (noDuplicate.length > 10) {
        noDuplicate.length = 10;
        throw Error('Колличество фотографий не более 10');
      }
      setValue('autoservice_img', noDuplicate, { shouldValidate: true });
    },
    [files, setValue]
  );

  const onError = (err: Error) => {
    setErrMsg(err.message);
    setTimeout(() => setErrMsg(''), 5000);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.svg', '.jpeg', '.jpg', '.webp'],
    },
    maxSize: MAX_FILE_SIZE.value,
    onDrop,
    onError,
    multiple: true,
  });

  const removeElement = (name: string): void => {
    const newArr = files.filter((file) => file.name !== name);
    setValue('autoservice_img', newArr);
  };

  const thumbs = files.map((file) => {
    const preview = URL.createObjectURL(file);
    return (
      <div className={styles.thumb} key={file.name}>
        <button
          type="button"
          onClick={() => removeElement(file.name)}
          className={styles.thumb__button}
        />
        <div className={styles.thumb__inner}>
          <img
            src={preview}
            className={styles.thumb__img}
            onLoad={() => {
              URL.revokeObjectURL(preview);
            }}
            alt={file.name}
          />
        </div>
      </div>
    );
  });

  return (
    <fieldset className={styles.fieldset}>
      <h2 className={styles.title}>Фотографии автосервиса</h2>
      <p className={styles.fieldset__note}>Можно добавить до 10 фотографий</p>
      <label htmlFor="autoservice_img">
        <div
          {...getRootProps()}
          className={`${styles.inputContainer} ${isDragActive && styles.label_focus}`}
        >
          <input {...getInputProps({ ...register('autoservice_img') })} />
          <p className={styles.input__note}>Добавить фото</p>
          {isDragActive ? (
            <p className={styles.input__dragNote}>Отпустите файлы сюда ...</p>
          ) : (
            <p className={styles.input__dragNote}>Можно перетащить его эту рамку</p>
          )}
        </div>
        <span className={styles.input__error}>{errMsg}</span>
      </label>
      <aside className={styles.thumbsContainer}>{thumbs}</aside>
    </fieldset>
  );
}

export default FieldsetAutoserviceImgUpload;
