import Image from "next/image";


function Social() {
  return (
    <div className=" fixed bottom-0 left-0 flex items-center justify-center ml-5 mb-5">
      <Image
        src="/Youtybe.svg"
        alt="YouTube Logo"
        width={20}
        height={20}
        className="mx-4"
      />
      <Image
        src="/instagram.svg"
        alt="Instagram Logo"
        width={20}
        height={20}
      />
    </div>
  );
}

export default Social;
