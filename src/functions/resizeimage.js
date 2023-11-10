/* eslint-disable prettier/prettier */
export default async function resizeImage(event) {

    const imageData = [];
    const previewData = []
    let input = event.target;
    let count = input.files.length;
    let index = 0;

    this.original_image = event.target.files;

    if (input.files) {
      while (count--) {

      
        const imageType = input.files[index].type;
        var reader = new FileReader();
        reader.onload = (e) => {
          //  this.preview.push(e.target.result);
          //resize image
          const image = new Image();
          image.src = e.target.result;

          image.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const maxDimension = 650;
            let width = image.width;
            let height = image.height;

            if (width > height && width > maxDimension) {
              height *= maxDimension / width;
              width = maxDimension;
            }
            else if (height > maxDimension) {
              width *= maxDimension / width;
              height = maxDimension;
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(image, 0, 0, width, height);
            const resizeImage = canvas.toDataURL(e.target.result.type);

            previewData.push(resizeImage);

            const trailing = imageType.toString().replace("image/", "")

           
            const newName = (Math.random() + 1).toString(36).substring(7) + "." + trailing;

            const binaryData = atob(resizeImage.split(',')[1]);
            const length = binaryData.length;
            const uint8Array = new Uint8Array(length);

            for (let i = 0; i < length; i++) {
              uint8Array[i] = binaryData.charCodeAt(i);
            }
            const newFile = new File([uint8Array], newName, { type: imageType });
            imageData.push(newFile);
          })

        };
        reader.readAsDataURL(input.files[index]);

        index++;
      }
    }

    return imageData;

}


