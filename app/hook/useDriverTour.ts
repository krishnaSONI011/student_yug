"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const useDriverTour = () => {
  return () => {
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
            description:
              "This is Student Yug where we encourage students to plant trees and play sports",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#plant-tree",
          popover: {
            title: "Plant Tree Counter",
            description:
              "See how many trees you have planted during your journey",
            side: "right",
            align: "center",
          },
        },
        {
          element: "#badge-earn",
          popover: {
            title: "Badges Earned",
            description:
              "Check your rank and achievements throughout the journey",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#sports-part",
          popover: {
            title: "Sports Participation",
            description:
              "Track the sports you are interested in",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#my-tree",
          popover: {
            title: "Your Trees",
            description:
              "View details of the trees you have planted",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#my-sports",
          popover: {
            title: "Your Sports",
            description:
              "See your sports participation history",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#all-tree",
          popover: {
            title: "Learn About Trees",
            description:
              "Discover how to plant and take care of trees",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#all-sports",
          popover: {
            title: "Learn About Sports",
            description:
              "Explore different sports and how to play them",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#post-create",
          popover: {
            title: "Create a Post",
            description:
              "Share your activities with the Student Yug community",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#profile",
          popover: {
            title: "Your Profile",
            description:
              "View and manage your profile details",
            side: "bottom",
            align: "center",
          },
        },
      ],
    });

    driverObj.drive();
  };
};
