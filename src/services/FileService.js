import { deleteObject, getBlob, getDownloadURL, listAll, uploadBytes } from "firebase/storage";
import FirebaseConfig from "../config/FirebaseConfig";

export async function uploadImage(file, path) {
  try {
    const ref = FirebaseConfig.getStorageRef(file.name, path);
    return await uploadBytes(ref, file);
  } catch (error) {
    console.error("Failed to upload image.", error);
    throw error;
  }
}

export async function uploadImages(images, path, deleteOnFail = true) {
  const uploadedImages = [];
  try {
    for (const image of images) {
      uploadedImages.push(await uploadImage(image, path));
    }
    return uploadedImages;
  } catch (error) {
    if (deleteOnFail) {
      await deleteImages(uploadedImages);
    }
    throw error;
  }
}

export async function deleteImages(images) {
  for (const image of images) {
    await deleteImage(FirebaseConfig.getStorageRefByPath(image._location.path));
  }
}

export async function deleteImage(imageRef) {
  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Failed to delete image.", error);
    throw error;
  }
}

export async function getImages(id, path) {
  try {
    const result = await listAll(FirebaseConfig.getStorageRef(id, path));
    const images = [];
    for (const item of result.items) {
      const url = await getDownloadURL(item);
      images.push({...item, url});
    }
    return images;
  } catch (error) {
    console.error("Failed to get images.", error);
  }
}

export async function getImagesAsFiles(id, path) {
  try {
    const result = await listAll(FirebaseConfig.getStorageRef(id, path));
    const files = [];
    for (const item of result.items) {
      const blob = await getBlob(item);
      files.push(new File([blob], item.name, {type: blob.type}));
    }
    return files;
  } catch (error) {
    console.error("Failed to get images.", error);
  }
}

const defaults = {
  uploadImage,
  uploadImages,
  deleteImage,
  deleteImages,
  getImages,
};
export default defaults;