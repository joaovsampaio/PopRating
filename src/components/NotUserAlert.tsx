import MaxWidthWrapper from "./MaxWidthWrapper";
import BtnLogin from "./ui/BtnLogin";

const NotUserAlert = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center gap-10 h-screen">
        <p className="text-neutral-100 text-lg text-center font-medium">
          É necessário uma conta
        </p>
        <BtnLogin />
      </div>
    </MaxWidthWrapper>
  );
};

export default NotUserAlert;
