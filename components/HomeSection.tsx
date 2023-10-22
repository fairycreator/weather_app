"use client";

import React, { useState } from "react";
import { Form } from "./Form";
import { CurrentData } from "./Current";
import { WeatherDetails } from "./WeatherDetails";
import { WeekForecast } from "./WeekForecast";
import { motion } from "framer-motion";

const HomeSection = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const apiKey = "92034b76704840fe9b6193758232210";

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      // Construct the URL with your API key
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=yes&alerts=yes`;

      // Fetch data from the API using the location
      const response = await fetch(url);
      const result = await response.json();

      // Check if the response contains an error
      if (result.error) {
        setError(result.error.message);
        setData({});
      } else {
        setError("");
        setData(result);
      }
    } catch (error) {
      setError("An error occurred while fetching data");
      setData({});
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocation(e.currentTarget.value);
  };

  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <motion.div
        className="text-white/75 text-center mt-[2rem] px-8 w-full flex justify-center flex-col items-center mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <h2 className="text-[45px] sm:text-[80px] font-bold max-w-[600px] font-josefin">
          Welcome to the Weather App
        </h2>
        <p className="text-lg sm:text-xl font-normal max-w-[600px] font-josefin">
          {" "}
          'Neath the shadow of ancient mountains high,
          <br />
          Where the stars kiss the edge of the sky.
          <br />
          In lands where elder forests grow,
          <br />
          And secrets in the murmuring winds doth blow. <br />
          <br />
          There, where the mists of time entwined,
          <br />
          Tales of old, in whispered verses, you'll find.
          <br />
          Of kingdoms lost and heroes of yore,
          <br />
          And the ever looming dark, forevermore. <br />
          <br />
          With every dawn, a new quest begun,
          <br />
          'Neath the watchful gaze of the setting sun.
          <br />
          In Middle-earth, where destinies intertwine,
          <br />
          The saga of ages, both yours and mine.
        </p>
      </motion.div>
    );
  } else if (error !== "") {
    content = (
      <div className="text-white text-center mt-[5rem] px-8">
        <h2 className="text-3xl font-semibold mb-4">City not found</h2>
        <p className="text-xl">Please enter a valid city name</p>
      </div>
    );
  } else {
    content = (
      <div className="text-white text-center mt-[5rem] px-8">
        <div className="flex md:flex-row flex-col items-center justify-between mt-[-4rem] gap-10">
          <CurrentData data={data} />
          <WeekForecast data={data} />
        </div>
        <WeatherDetails data={data} />
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col justify-center items-center text-center">
      <div className="px-8">
        <Form handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      {content}
    </section>
  );
};

export { HomeSection };
