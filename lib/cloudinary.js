export async function search(options){

    const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=pawpal-uploads/${options}`, {
    headers:{
      Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
    }
  }).then(res => res.json());
  console.log('results',results);

  return results;
}

export function mapImageResources(resources){
    return resources.map(resource => {
        const{width, height} = resource;
      return{
        id: resource.asset_id,
        title: resource.public_id,
        image: resource.secure_url,
        width,
        height
      }
    })
  
}