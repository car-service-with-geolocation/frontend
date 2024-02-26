/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import useWindowWidth from '../../utils/windowWidth';
import ProgressbarPreloader from '../Preloader/ProgressbarPreloader/ProgressbarPreloader';
import styles from './styles/styles.module.css';

export type TDragAndDropProps = {
  onFilesDrop: (files: (File & { preview: string })[]) => void;
};

function DragAndDrop({ onFilesDrop }: TDragAndDropProps) {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const { width } = useWindowWidth();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function handleDrop(files: (File & { preview: string })[]) {
    onFilesDrop(files); // передает собранные файлы от дочернего компонента к родительскому
  }

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
        const newFiles = [
          ...files,
          ...acceptedFiles.slice(0, 5 - files.length).map((file) => {
            const fileWithPreview = Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
            return fileWithPreview;
          }),
        ];
        if (files.length + acceptedFiles.length > 5) {
          removeImagePreloader();
          setErrorMsg('Вы можете загрузить только 5 фотографий');
        } else {
          setFiles(newFiles);
          handleDrop(newFiles); // вызываю колбэк функцию, чтобы передать собранные файлы в родительский компонент через пропсы
          removeImagePreloader();
          setErrorMsg('');
        }
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const thumbs = files.map((file, index) => (
    <div className={styles.imagePreviewContainer} key={file.name}>
      {isLoading || !isImageLoaded ? (
        <ProgressbarPreloader />
      ) : (
        <>
          <img
            src={file.preview}
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
      files.forEach((file) => URL.revokeObjectURL(file.preview)); // To revoke the Object URL to avoid memory leaks
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
        <input {...getInputProps()} type="file" name="images" multiple />
        <p className={`${styles.textRemark} ${styles.textRemarkInput}`}>Добавить фото</p>
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

export default DragAndDrop;
