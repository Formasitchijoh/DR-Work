const formateDate = ():string =>{
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let currentDate = new Date()
    const datet = currentDate.getDate()
    const month = months[currentDate.getMonth()]
    const years = currentDate.getFullYear()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
      return `${datet} ${month} ${years}@ ${hours}:${minutes}`
  }

  export default formateDate