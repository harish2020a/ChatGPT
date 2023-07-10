"use client";
import { signOut, useSession } from "next-auth/react";
import NewChat from "../NewChat/NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import ChatRow from "../ChatRow/ChatRow";
import ModelSelection from "../ModelSelection/ModelSelection";
import { useState } from "react";

const SideBar = () => {
  const [isLogOut, setIsLogOut] = useState(false);
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading chats...</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <div
          onClick={() => signOut()}
          onMouseEnter={() => setIsLogOut(true)}
          onMouseLeave={() => setIsLogOut(false)}
          className="cursor-pointer mb-2 mx-auto text-sm"
        >
          {isLogOut ? (
            <p className="h-8 w-20 rounded-lg bg-red-600 text-center animate-pulse pt-1">
              Log Out
            </p>
          ) : (
            <img
              src={session.user?.image!}
              alt="Profile"
              className="h-12 w-12 rounded-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SideBar;
