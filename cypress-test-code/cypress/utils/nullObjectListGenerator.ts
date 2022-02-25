import { cloneDeep } from "lodash-es";

/**
 * this function generate a list of objects with one iterated key value be set to null, an array won't be considered as an object here
 * @param obj, should have no null values
 * @return array, objects with 1 null value in each one
 * @example {a:1, b:2} => [{a:null, b:2}, {a:1, b:null}]
 */

export function nullObjectListGenerator(obj: object): Array<object> {
  let obj_list = [];
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == "object" && !Array.isArray(obj[property])) {
        let obj_clone = cloneDeep(obj);
        obj_clone[property] = null;
        obj_list.push(obj_clone);
        let sub_obj_list = nullObjectListGenerator(obj[property]);
        for (let sub_obj of sub_obj_list) {
          let obj_clone = cloneDeep(obj);
          obj_clone[property] = sub_obj;
          obj_list.push(obj_clone);
        }
      } else {
        let obj_clone = cloneDeep(obj);
        obj_clone[property] = null;
        obj_list.push(obj_clone);
      }
    }
  }
  return obj_list;
}
