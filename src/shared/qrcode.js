import QRCode from'qrcode'

 const qrcodeGenerator=async(data)=>{
   const url= await QRCode.toDataURL(JSON.stringify(data))
   return url
}
export default qrcodeGenerator