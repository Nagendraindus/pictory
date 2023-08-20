import React from "react";
import{BsDownload} from "react-icons/bs";
import FileSaver from 'file-saver';
import Spinner from "@/components/Spinner";


const IMAGE_SIZES = [
	{value: "256x256", label: "256 X 256"},
	{value: "512x512", label: "512 X 512"},
	{value: "1024x1024", label: "1024 X 1024"},
]

const ImageCard = ({url}) =>{
     const [loading,setLoading]= React.useState(false)

     const downloadImage = async(url)=>{

      setLoading(true)

      let response = await fetch('api/download',{
        method:'POST',
        body: JSON.stringify({url}),
        headers :{
          'Content-type': 'application/json'
        }
      })

      if(response.ok){
        const blob = await response.blob()
        FileSaver.saveAs(blob,'image.png')
      }else{
        console.error('error')
      }
      setLoading(false)

     }
  return (

    <div className={"p-1 bg-transparent relative md-5 w-full shadow-md"}>
      <div className={"h-auto hover:opacity-75"}>
        <img src={url} height={"auto"} width={"100%"} className={"rounded-md object-contain"}/>
      </div>
      <div className={"absolute right-4 top-4 text-white"}>
        {
           loading ? 
           <Spinner/>
          : 
         <button onClick={()=> downloadImage(url)} className={"rounded-full bg-primary light"}> <BsDownload size={22}/>
       </button>
        }
       
      </div>

    </div>
    

  )


}

export default function Home() {
  const[prompt, setPrompt] = React.useState("")
  const[size,setSize] = React.useState(IMAGE_SIZES[0].value)
  const[images,setImages] = React.useState([])
  
  const[loading, setLoading] = React.useState(false)



  const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		let response = await fetch("/api/generate", {
			method: "POST",
			body: JSON.stringify({prompt, size}),
			headers: {
				'content-type': 'application/json'
			}
		})

		if (response.ok) {
			response = await response.json()
			setImages(response.data)
		}

		setLoading(false)
	}

  return (
    <main className="bg-slate-200">
      <main>
      <div className={" max-w-5xl mx-auto px-2 lg:px-0 "}>
      <h1 className={"inline-block text-transparent bg-clip-text py-4 text-6xl font-bold bg-gradient-to-r from-[#dd1846] to [#ec2f40] font-squarePeg"}>
      PICTORY
      </h1>
      </div>
      <div className={"max-w-6xl mx-auto px-5 lg:px-0 min-h-[calc(100vh-170px)]"}>
        <form className={"mt-4"} onSubmit={handleSubmit}>
          <div className={"grid grid-cols-2 gap-4"}>
            <div className={"border-2"}> 
            <label 
            htmlFor={"prompt"}
            className={"block test-sm font-bold text-primary-main leading-6"}>
            Describe The image Idea:
            </label>
            <textarea 
            onChange={(e)=>setPrompt(e.target.value)}
            id={"prompt"}
            placeholder={"Generate a white furry cat sitting on a chair"}
            rows={2}
            className={" mt-2 block w-full px-2 py-1 rounded-md shadow-sm resize-none text-primary-main placeholder:text-primary-veryLight border border-primary-main outline-primary-main text-md"}>

            </textarea>
            <span className={"mt-1 text-xs text-bold leading-6 text-primary-main"}>
              Imagination Has No length 😊
            </span>
            </div>
            <div>
              <div className={"w-full"}>
                <label htmlFor={"size"} className={"block text-sm font-medium leading-6 text-primary-main"}>
                  Select Image Size :
                </label>
                <select 
                id={"size"}
                onChange={(e)=>setSize(e.target.value)}
                className={"mt-2 w-full px-2 py-3 rounded-md shadow-sm border border-primary-main outline-primary-main text-primary-main"}>
                  {
                    IMAGE_SIZES.map(({value,label}, index) => (
                      <option key={index} value={value }>
                          {label}
                      </option>
                    ))
                  }
                </select>

                <div className={"mt-5 text-right"}>
                  <button
                  type={"submit"}  
                  disabled={loading}
                  className={"rounded-md bg-primary-main px-3 py-2 border-2 hover:bg-primary-dark hover: text-primary-contrastText font-semibold shadow-sm disabled:bg-primary-light disabled:cursor-not-allowed"}>
                    {loading ? "generating...." : "generate"}
                  </button>
                </div>


              </div>
            </div>
          </div>

        </form>

        <div className={" flex h-100 justify-center items-center mt-4 pt-4 border-t"}>
            {
              loading
              ?
              <div className="h-100 flex flex-col justify-center items-center">
                <p className="text-md text-primary-main text-center font-bold my-10">
                  Generating images..
                </p>
                  <img src={"/art.svg"} className={" w-1/3 sm:1/5 h-3/4"}></img> 
              </div>:
              images.length >0
              ?<div className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"}>
              {
                images.map(({url},index)=><ImageCard url ={url}/>)
              }  
              </div>
              :<div className="h-100 flex flex-col justify-center items-center">
              <p className="text-md text-primary-main text-center font-bold my-10">
                No images right now...
              </p>
                <img src={"/art.svg"} className={"w-1/3 sm:1/5 h-3/4"}></img>
            </div>
            }
        </div>

      </div>
      <div className={"flex justify-between items-center max-w-6xl mx-auto border-2 px-5 lg:px-0"}>
        <div className={"text-sm uppercase text-primary-main "}>
          all rights reserved
        </div>
        <div>  
          <a href={"https://github.com/Nagendraindus/"} target={"_blank"}>
           <img src={"/github-mark.svg"} alt={"github-repo"} className={"h-7 w-7"}/>
          </a>
        </div>
      </div>
  
     
    </main>
    </main>
  )
}


