import styles from "../styles/Home.module.css";

// Next
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactPlayer from 'react-player'


// Firebase
import { database } from "../firebaseConfig";
import { ref, get, child } from "firebase/database";

// React Redxu
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";

// Icons
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

// Other libs
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [roomId, setRoomId] = useState(""); // Stores the entered room id
  const [activeForm, setActiveForm] = useState(true); // Switches between forms

  useEffect(() => {
    // Resets user or logouts user
    dispatch(resetUser());
  }, [dispatch]);

  // Checks whether the room exists and navigates the user to that room
  const joinRoom = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Waiting...");
    get(child(ref(database), `rooms/${roomId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          router.push(`/edit?q=${roomId}`);
        } else {
          toast.error("Invalid Room Id", {
            id: toastId,
          });
          console.log("ERROR!");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sketcherly</title>
        <meta
          name="description"
          content="Real-time Collaboration Design Tool"
        />
        <link rel="icon" href="/images/Sigma Logo.png" />
      </Head>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#303544",
            color: "#ffffff",
          },
        }}
      />
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Image
            src="/images/Sigma Logo.png"
            width="50px"
            height="50px"
            alt="logo"
            className={styles.logoIcon}
          />
          <h3 className={styles.name}>Sketcherly</h3>
        </div>
        <a href="https://github.com/Nishu0/Sketcherly" target="blank">
          <button className={`${styles.github} ${styles.star}`}>
            <FaGithub style={{ fontSize: "20px", color: "#C1C2C7" }} />
            <p>Star on GitHub</p>
          </button>
        </a>
      </nav>
      <div className={styles.update}>🚧 UNDER CONSTRUCTION</div>
      <h1 className={styles.heading}>
        Real-time Collaboration <span>Design</span> Tool
      </h1>
      <h2 className={styles.caption}>
        Sketcherly is a web app where you can make stunning designs with your team
        supafast! ⚡
      </h2>
      {activeForm ? (
        <Link href="/auth">
          <button type="submit" className={styles.submit}>
            Sign Up
          </button>
        </Link>
      ) : (
        <form onSubmit={joinRoom} className={styles.form}>
          <input
            type="text"
            id="room"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            className={styles.input}
            placeholder="Enter Room Code"
          ></input>
          <button type="submit" className={styles.submit}>
            Join
          </button>
        </form>
      )}
      <p
        className={styles.switchForm}
        onClick={() => setActiveForm((prev) => !prev)}
      >
        {activeForm ? "or, join a room" : "or, create a room"}
      </p>
      <a href="https://github.com/Nishu0/Sketcherly" target="blank">
        <button className={`${styles.submit} ${styles.star2}`}>
          <FaGithub style={{ fontSize: "20px", color: "#FFFFFF" }} />
          <p>Star on GitHub</p>
        </button>
      </a>
      <div className={styles.preview}>
        <ReactPlayer
          light={<img src='https://res.cloudinary.com/dyk5s8gbw/image/upload/v1697643836/Sketcherly_Thumbnail_kfjito.png' alt='Thumbnail' />} 
          url='https://res.cloudinary.com/dyk5s8gbw/video/upload/v1697568154/Sketcherly_bezaqt.mkv'
          controls={true} 
          playing={true}
          loop={true}
          width="854px"
          height="480px"
        />
        {/* <Image
          src="/images/SGP_Home_Page.png"
          alt="preview"
          width="1900px"
          height="940px"
        /> */}
      </div>
      <footer className={styles.footer}>
        <a
          href="https://github.com/Nishu0/Sketcherly"
          target="blank"
          className={styles.signature}
        >
          Made with ☕ and ❤️
        </a>
        <a href="https://github.com/Nishu0/Sketcherly" target="blank">
          <button
            type="button"
            className={`${styles.github} ${styles.feature}`}
          >
            View Feature List
            <FiExternalLink />
          </button>
        </a>
      </footer>
    </div>
  );
}
