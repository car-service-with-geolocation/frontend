/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { MAX_FILE_SIZE } from '../../utils/constants';
import useWindowWidth from '../../utils/windowWidth';
import ProgressbarPreloader from '../Preloader/ProgressbarPreloader/ProgressbarPreloader';
import styles from './styles/styles.module.css';

export type TImgFile = File;

export type TDragAndDropProps = {
  onFilesChanged: (files: TImgFile[]) => void;
};

export function DragAndDrop({ onFilesChanged }: TDragAndDropProps) {
  const [files, setFiles] = useState<TImgFile[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const { width } = useWindowWidth();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    onFilesChanged(files);
  }, [files, onFilesChanged]);

  const setImagePreloader = () => {
    setIsLoading(true);
    setIsImageLoaded(false);
  };

  const removeImagePreloader = () => {
    setIsLoading(false);
    setIsImageLoaded(true);
  };

  const onDrop = (acceptedFiles: File[]) => {
    setImagePreloader();
    if (files && acceptedFiles) {
      const alreadyAddedFiles = acceptedFiles.filter((file) =>
        files.find((f) => f.name === file.name)
      );

      if (alreadyAddedFiles.length > 0) {
        removeImagePreloader();
        setErrorMsg('Вы уже добавили такой файл');
      } else {
        const newFiles = [...files, ...acceptedFiles.slice(0, 5 - files.length)];
        if (files.length + acceptedFiles.length > 5) {
          removeImagePreloader();
          setErrorMsg('Вы можете загрузить только 5 фотографий');
        } else {
          setFiles(newFiles);
          removeImagePreloader();
          setErrorMsg('');
        }
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.svg', '.jpeg', '.jpg', '.webp'],
    },
    maxSize: MAX_FILE_SIZE.value,
    onDrop,
    multiple: true,
  });

  const thumbs = files.map((file, index) => (
    <div className={styles.imagePreviewContainer} key={file.name}>
      {isLoading || !isImageLoaded ? (
        <ProgressbarPreloader />
      ) : (
        <>
          <img
            src={URL.createObjectURL(file)}
            className={styles.imagePreview}
            alt="фотография поломки"
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className={styles.deleteButtonContainer}>
            <button
              className={styles.deleteButton}
              onClick={() => {
                setFiles((files) => files.filter((_, i) => i !== index));
                setErrorMsg('');
              }}
            />
          </div>
        </>
      )}
    </div>
  ));

  useEffect(
    () => () => {
      // files.forEach((file) => URL.revokeObjectURL(file.preview)); // To revoke the Object URL to avoid memory leaks
      setIsLoading(false);
      setIsImageLoaded(true);
    },
    [files]
  );

  return (
    <div className={styles.imageInputsContainer}>
      <div
        {...getRootProps()}
        className={
          isDragActive
            ? `${styles.dragAndDropInput} ${styles.dragAndDropInputActive}`
            : styles.dragAndDropInput
        }
      >
        <input {...getInputProps()} type="file" multiple />
        <p className={styles.textRemarkInput}>Добавить фото</p>
        {width >= 600 ? (
          <p className={styles.textRemark}>Можно перетащить его в эту рамку</p>
        ) : (
          <span />
        )}
      </div>
      <aside className={styles.imageInputsContainer}>{thumbs}</aside>
      <span className={styles.errorImage}>{errorMsg}</span>
    </div>
  );
}
