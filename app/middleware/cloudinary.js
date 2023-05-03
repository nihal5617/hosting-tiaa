import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: "dkketilf1",
    api_key: "267779842926789",
    api_secret: "UOwr4TCNwu-CdylhWcheIglpLN4",
});

export const cloudinaryUploadImage = async (fileToUpload) => {
	try {
		const data = await cloudinary.uploader.upload(fileToUpload, {
			resource_type: 'auto',
		});
		return {
			url: data?.secure_url,
		};
	} catch (error) {
        console.log(error);
		return error;
	}
};
