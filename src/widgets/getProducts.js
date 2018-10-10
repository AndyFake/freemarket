


export async function getProducts(){
  try{
    var data = await fetch('https://api.github.com/repos/marchingband/freemarket/contents/content/products',{ method:"GET" })
      .then(r=>r.json())
      .then(r=>getFiles(r.map(f=>f.path)))
    return data
  } catch(e) {
    console.log(e)
  }
}

async function getFiles(paths){
  try{
    var data = await Promise.all(
      paths.map(path=>
        fetch('https://api.github.com/repos/marchingband/freemarket/contents/'+path,{ method:"GET" })
        .then(r=>r.json()).then(r=>{
          return JSON.parse(atob(r.content))
        })
      )
    )
    return data
  } catch (error) {
    console.log(error)
  }
}
