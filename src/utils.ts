const isObject = (obj:any) => Object.prototype.toString.call(obj) === '[object Object]';

const isArray = (obj:any) => Object.prototype.toString.call(obj) === '[object Array]';

export const equalsObj = (oldData:any, newData:any) => {
  if(oldData === newData)return true;
  if(isObject(oldData) && isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length){
    for (const key in oldData) {
      if (Object.prototype.hasOwnProperty.call(oldData, key)) {
        if(!equalsObj(oldData[key], newData[key])){
          return false;
        }
      }
    }
  }else if(isArray(oldData) && isArray(oldData) && oldData.length === newData.length){
    for (let i = 0, length = oldData.length; i < length; i++) {
      if(!equalsObj(oldData[i], newData[i])){
        return false;
      }
    }
  }else{
    return false;
  }
  return true;
};

