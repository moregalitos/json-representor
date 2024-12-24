
# jsonbugs

a module to represents large json or objects


## how to use

```
npm i jsonbugs
```
```js
import {json} from "jsonbugs"
const data = {
    name:'John doe',
    age:69
}
json(JSON.stringify(data),{mode:'dark'})
```
