import { useFormContext } from 'react-hook-form';

import { DragAndDrop } from '../DragAndDrop/DragAndDrop';
import styles from './styles/styles.module.css';

function FieldsetAutoserviceImgUpload() {
  const { register, setValue } = useFormContext();

  const handleFilesDrop = (droppedFiles: File[]) => {
    setValue('autoservice_img', droppedFiles);
  };

  return (
    <fieldset className={styles.fieldset}>
      <h2 className={styles.title}>Фотографии автосервиса</h2>
      <p className={styles.fieldset__note}>Можно добавить до 5 фотографий</p>
      <DragAndDrop onFilesChanged={handleFilesDrop} />
      <input {...register('autoservice_img')} type="hidden" />
    </fieldset>
  );
}

export default FieldsetAutoserviceImgUpload;
