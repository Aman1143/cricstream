"use client"
import React, { useEffect, useRef, useState } from 'react' 
import Button from '@/layouts/Button'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
interface Params {
  id: string;
}
interface Gig {
  thumbNail: {
    url: string,
  },
  title: String,
  desc: String,

}
const page = ({ params }: { params: Params }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const searchParams = useSearchParams();
  const [gigItem, setGigItem] = useState<Gig | null>();
  let cardId = searchParams.get("cardId");
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.autoplay = true;
    }
  }, [])

  const fetchGig = async () => {
    try {
      let res = await axios.get(`/api/getGig/${cardId}`)
      let result = await res.data;
      if (result.success) {
        setGigItem(result.gig);
      } else {
        console.log("nahi");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGig();
  }, [cardId])


  return (
    <section className='h-screen'>
      <div className="container h-full flex flex-col">
        {
          gigItem && (
            <div className=" flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 mt-32">
              <img className=" rounded-xl h-80 w-96 mr-2" src={gigItem.thumbNail.url} alt="img" />

              <div className=" space-y-4 lg:pt-14">
                <h1 className=" font-semibold text-4xl text-center md:text-start">
                  Title
                </h1>
                <p>
                  {gigItem.title}
                </p>
                <p>
                  {gigItem.desc}
                </p>
                <div className=" flex justify-center lg:justify-start">
                  <Button title="Learn More" />
                </div>
              </div>
            </div>
          )
        }
        <div className='mt-8'>
          <video width="800px"
            height="auto"
            controls
            autoPlay
            className='bg-slate-400 mb-96 ml-96'
            playsInline
          >
            <source src={`/api/upload/${params.id}`} type='video/mp4' />
          </video>
        </div>
      </div>



    </section>

  )
}

export default page