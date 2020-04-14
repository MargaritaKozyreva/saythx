import Post from '@components/Post' 
import json from './assets/json'
import xml from './assets/xml-file.xml'
import PhotoLogo from './assets/telegramm.png'
import './styles/styles.css'


const post = new Post('Webpack Post Title', PhotoLogo);
console.log('Post To String: ' ,post.toString()) 

console.log(json)
console.log(xml)