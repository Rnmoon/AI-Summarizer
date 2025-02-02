import { useState, useEffect } from "react";
import { linkIcon, copy, loader, tick} from '../assets'
import {useLazyGetSummaryQuery} from '../services/article'

const Demo = () => {
  const [article,setArticle] = useState({
    url:'',
    summary:'',
  });
  const [allArticle,setALLArticle] = useState([])
  const [copied, setCopied] = useState("")

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if(articlesFromLocalStorage){
      setALLArticle(articlesFromLocalStorage)
    }
  },[])
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const {data} = await getSummary({articleUrl: article.url});
      if(error){
        console.error("API ERROR: ",error);
      }
      if(data?.summary){
        const newArticle = {...article,summary: data.summary};
        const updatedAllArticle = [newArticle,...allArticle]
        setArticle(newArticle)
        setALLArticle(updatedAllArticle)
        
        localStorage.setItem('articles', JSON.stringify(updatedAllArticle));
        console.log(newArticle);
      }
    }catch(err){
      console.error("Error while fetching summary: ",err);
    }
  }
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 2000);
  }
  const handleRemove = (index) => {
    const updatedArticles = allArticle.filter((_, i) => i !== index);
    setALLArticle(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles)); // Save to localStorage
  };
  return (
  <section className="mt-16  w-full max-w-xl">
    <div className="flex flex-col w-full gap-2">
      <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
        <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5" />
        <input 
          type="url" 
          placeholder="Enter a URL"
          value={article.url}
          onChange={(e)=> setArticle({
            ...article, url: e.target.value
          })}
          required
          className="url_input peer"
          />
          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            ↵
          </button>
      </form>
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticle.map((item,index)=>(
            <div key={`link-${index}`}
                onClick={()=>setArticle(item)}
                className="link_card"
            >
              <div className="copy_btn" onClick={()=> handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain" />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
              <button
        onClick={() => handleRemove(index)}
        className="ml-2 text-white text-xs px-2 py-1 rounded"
      >
      ❌
      </button>
            </div>
          ))}
          
      </div>
    </div>
    {/* Display Result */}
    <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
          ):error ? (
            <p className="font-satoshi font-normal text-gray-700">Well, that wasn&apos;t supposed to happen... <br /> <span>{error?.data.error}</span></p>
          ):(
            article.summary &&(
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">Article <span className="blue_gradient">Summary</span></h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                </div>
              </div>
            )
          )}
    </div>
  </section>
 
  )
};

export default Demo;
