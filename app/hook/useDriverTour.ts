"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const useDriverTour = () => {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      overlayOpacity: 0.75,

      nextBtnText: "Next",
      prevBtnText: "Back",
      doneBtnText: "Finish",

      steps: [
        {
          element: "#logo",
          popover: {
            title: "Welcome 👋",
            description: "This is Student Yug Where We Encourage Student For Planting Tree And Play Sports",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#plant-tree",
          popover: {
            title: "Plant Tree Counter",
            description: "This is Where You know about the count of the tree you have planted across your journey",
            side: "right",
            align: "center",
          },
        },
        {
          element: "#badge-earn",
          popover: {
            title: "Badges Earn",
            description: "This is Your Badges here You can see you status of the rank through out the journey",
            side: "left",
            align: "center",
          },
        },
        {
            element: "#sports-part",
            popover: {
              title: "Sports Partisipation",
              description: "This is where you see the how many sports you are intrusted in  through out the journey",
              side: "left",
              align: "center",
            },
          },
          {
            element: "#my-tree",
            popover: {
              title: "Your Planted Tree Details",
              description: "In this tab you will see the details of your Planted trees",
              side: "left",
              align: "center",
            },
          },
          {
            element: "#my-sports",
            popover: {
              title: "You Sports",
              description: "This is where you will know your partisition sports",
              side: "left",
              align: "center",
            },
          },
          {
            element: "#all-tree",
            popover: {
              title: "Know About the Tree",
              description: "This is where you will know about the tree and how you will plant a tree and taking care of the tree",
              side: "left",
              align: "center",
            },
          },
          {
            element: "#all-sports",
            popover: {
              title: "Know About the Sports",
              description: "This is where you will know about the sports and how you can play a sports",
              side: "left",
              align: "center",
            },
          },
          {
            element: "#post-create",
            popover: {
              title: "You can Post",
              description: "This is where you can post a post to the community where other student can know about your doing",
              side: "bottom",
              align: "center",
            },
          },
          {
            element: "#profile",
            popover: {
              title: "Your Profile",
              description: "This is you profile in which you know you profile",
              side: "bottom",
              align: "center",
            },
          },
      ],
    });

    driverObj.drive();

    return () => {
      driverObj.destroy();
    };
  }, []);
};
