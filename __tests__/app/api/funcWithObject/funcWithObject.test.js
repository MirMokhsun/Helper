import { returnObjectLength } from "../../../../app/api/funcWithObject/funcWithObject";

describe('test func returnObjectLength', () => {

    test('if param false length 0 ', () => {
        let result = returnObjectLength(false)
        expect(result).toEqual(0);
    });   

    test('if param number length 0 ', () => {
        let result = returnObjectLength(123)
        expect(result).toEqual(0);
    });   

    test('if param string length 0 ', () => {
        let result = returnObjectLength({'asd':'asd','asa':'asdas','qweasd':'qwe'})
        expect(result).toEqual(3);
    });   
});