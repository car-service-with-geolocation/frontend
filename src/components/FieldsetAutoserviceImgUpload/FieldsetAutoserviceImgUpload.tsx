import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import styles from './styles/styles.module.css';

function FieldsetImgUpload() {
  const onDrop = useCallback((acceptedFiles: unknown): [] => {
    console.log(acceptedFiles);
    return [];
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <fieldset>
      <h2>Фотографии автосервиса</h2>
      <p>Можно добавить до 10 фотографий</p>
      <label htmlFor="autoservice_name" className={styles.form__label}>
        Основные услуги:
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <span className={styles.input__error}>errors</span>
      </label>
    </fieldset>
  );
}

export default FieldsetImgUpload;
