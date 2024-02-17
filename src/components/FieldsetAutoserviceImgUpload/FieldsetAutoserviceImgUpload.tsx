import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

// import { useFormContext } from 'react-hook-form';
import styles from './styles/styles.module.css';

function FieldsetAutoserviceImgUpload() {
  // const { register } = useFormContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [files, setFiles] = useState<any[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // const onDrop = useCallback((acceptedFiles: unknown): [] => {
  //   console.log(acceptedFiles);
  //   setFiles(acceptedFiles.map(file => Object.assign(file, {
  //   preview: URL.createObjectURL(file);
  //   return [];
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img
          src={file.preview}
          className={styles.img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt="rfhnbh"
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <fieldset>
      <h2>Фотографии автосервиса</h2>
      <p>Можно добавить до 10 фотографий</p>
      <label htmlFor="autoservice_img" className={styles.form__label}>
        Основные услуги:
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {/* {...register('autoservice_img')} */}
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <span className={styles.input__error}>errors</span>
      </label>
      <aside className={styles.thumbsContainer}>{thumbs}</aside>
    </fieldset>
  );
}

export default FieldsetAutoserviceImgUpload;
