const category = [
    {
        title:'Posts',
        route:'posts',
        className:'btn1'
    },
    {
        title:'Comments',
        route:'comments',
        className:'btn2'
    },
    {
        title:'Todos',
        route:'todos',
        className:'btn3'

    },
    {
        title:'Users',
        route:'users',
        className:'btn4'

    },
    {
        title:'Albums',
        route:'albums',
        className:'btn5'

    },
    {
        title:'Photos',
        route:'photos',
        className:'btn6'

    },
]

// DOM-ELEMENTS
const $result = document.querySelector('.result')
const $container = document.querySelector('.card_container')
const $loader = document.querySelector('.loading')
// DOM-ELEMENTS-END


function getBase(endPoint, cb) {
    fetch(`https://jsonplaceholder.typicode.com/${endPoint}`)
    .then(res => res.json())
    .then(r => cb(r))
}


window.addEventListener('load', () => {
    $loader.innerHTML = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
    getBase('posts' , res => {
        return cardTemplate('posts' , res)
    })
    const btnTemplate = category.map(({className, title, route}) => {
        return BtnTemplate(className, title, route)
    }).join('')
    $result.innerHTML = btnTemplate
})

function BtnTemplate (className, title, route) {
    return `
        <button
        onclick="getRoute('${route}')"
        class="${className}">${title}
        </button>
    `
}

function getRoute(route) {
    getBase(route, res => {
        cardTemplate(route,res)
    })
}

function cardTemplate(route, res) {
    console.log(res);
   if(route === 'posts'){
       const template = res.map(({title,body}) => {
           return cardPost(title,body)
       }).join('')

       $container.innerHTML = template

   }else if(route === 'comments'){
    const template = res.map(({name,email,body}) => {
        return cardComments(name,email,body)
    }).join('')
    $container.innerHTML = template

   }else if(route === 'todos'){
    const template = res.map(({id,title,completed}) => {
        return cardTodos(id,title,completed)
    }).join('')
    $container.innerHTML = template

   }else if(route === 'users'){
    const template = res.map(({id,name,username,email,phone,website}) => {
        return cardUsers(id,name,username,email,phone,website)
    }).join('')
    $container.innerHTML = template

   }else if(route === 'albums'){
    const template = res.map(({id,title}) => {
        return cardAlbums(id,title)
    }).join('')
    $container.innerHTML = template

   }else if(route === 'photos'){
    const template = res.map(({id,title,url}) => {
        return cardPhotos(id,title,url)
    }).join('')
    $container.innerHTML = template
   }
}

function cardPost(title,body) {
    return `
        <div class="post1">
            <div class="post2">
                <div class="title">
                    <h3>${title}</h3>
                </div>
                <div class="content">
                    <p>${body}</p>
                </div>
            </div>
        </div>
    `
}

function cardComments(name, email,body) {
     return `
        <div class="comments1">
            <div class="comments2">
                <div class="title">
                    <h3>${name}</h3>
                    <p>${email}</p>
                </div>
                <div class="content">
                    <p>${body}</p>
                </div>
            </div>
        </div> 
     `
}
function cardTodos(id,title,completed) {
    return `
       <div class="todos1">
           <div class="todos2">
               <div class="title">
                   <h3>ID: ${id}</h3>
                   <p>TITLE: ${title}</p>
               </div>
               <div class="content">
                   <p>COMLETED: ${completed}</p>
               </div>
           </div>
       </div> 
    `
}
function cardUsers(id,name,username,email,phone,website) {
    return `
       <div class="users1">
           <div class="users2">
               <div class="title">
                   <h3>ID: ${id}</h3>
               </div>
               <div class="content">
                   <p>NAME: ${name}</p>
                   <p>USERNAME: ${username}</p>
                   <p>EMAIL: ${email}</p>
                   <p>PHONE: ${phone}</p>
                   <p>WEBSITE: ${website}</p>
               </div>
           </div>
       </div> 
    `
}

function cardAlbums(id,title,) {
    return `
       <div class="albums1">
           <div class="albums2">
               <div class="title">
                   <h3>ID: ${id}</h3>
               </div>
               <div class="content">
                   <p>TITLE: ${title}</p>
               </div>
           </div>
       </div> 
    `
}

function cardPhotos(id,title,url) {
    return `
       <div class="photos1">
           <div class="photos2">
               <div class="title">
                   <h3>ID: ${id}</h3>
               </div>
               <div class="content">
                   <p>TITLE: ${title}</p>
                   <img src="${url}">
               </div>
           </div>
       </div> 
    `
}