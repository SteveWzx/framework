/**
 * Created by dongyuanjie.wudi on 2018/3/26.
 */

export function componentA () {
    console.log('aaaa--aa')
    let ul = document.createElement('ul')
    ul.innerHTML =
        `
        <li>0</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        `

    return ul
}