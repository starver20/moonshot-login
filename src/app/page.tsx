/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { api } from "~/trpc/react";
import Card from "./_components/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "./_components/loading";
import { useUser } from "./_context/user-context";

const limit = 10;
export default function Home() {
  const router = useRouter();
const {dispatch, state} = useUser()
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(0);
  const [userProducts, setUserProducts] = useState<number[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    if (userId) {
      setUserId(userId);
    } else {
      router.replace("/sign-in");
    }
  }, [router, state]);

  const { data: user, isLoading } = api.auth.getUserInfo.useQuery({
    id: Number(userId),
  });

  useEffect(() => {
    if(user && state && (state.user.id !== user.id)){
      dispatch({type: 'setUser', paylod: user})
    }
  },[user, dispatch, state])

  const {data: fetchedUserProducts}  = api.userProducts.getProductsByUserId.useQuery({ userId: Number(userId) });

  useEffect(() => {
    if(fetchedUserProducts){
      setUserProducts(fetchedUserProducts.map((item) => item.productId))
    }
  },[fetchedUserProducts])

  console.log(fetchedUserProducts)


  const { data: products, isLoading: isLoadingProducts } =
    api.products.getProducts.useQuery({ skip: page * limit, limit });

  const addProductToUser = api.userProducts.addProductsToUser.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const removeProductFromUser = api.userProducts.removeProductsFromUser.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });



  const ProductItem = ({ name, id }: { name: string; id: number }) => {
    return (
      <div className="flex items-center">
        <input
          checked={userProducts.includes(id)}
          onChange={(e) => {
            if(e.target.checked){
              setUserProducts([...userProducts, id]);
              addProductToUser.mutate({ productId: id, userId: Number(userId) });
            }else{
              setUserProducts(userProducts.filter((item) => item !== id));
              removeProductFromUser.mutate({ productId: id, userId: Number(userId) });
            }
          }}
          id="checked-checkbox"
          type="checkbox"
          value={id}
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        />
        <label className="ms-2 text-sm font-medium text-black">{name}</label>
      </div>
    );
  };

  return (
    <main className="flex h-[calc(100vh-146px)] items-center justify-center">
      {(!userId || isLoading) && <LoadingPage />}
      {user && !isLoading && (
        <Card>
          <div>
            <h1 className="mb-6 text-center text-3xl font-semibold">
              Please mark your interests
            </h1>
            <p className="mb-6 text-center font-light">
              We will keep you notified
            </p>
            <h3 className="text-xl"> My saved interests!</h3>
          <div className="flex flex-col gap-2 mt-4">
            {products?.map((product) => (
              <ProductItem
                name={product.name}
                id={product.id}
                key={product.id}
              />
            ))}
            </div>
            <div className="flex justify-center items-center gap-2">
              <button
                className="rounded-md py-1 px-2"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
              >
                {'<'}
              </button>
              {page > 1 && <p className="font-extralight text-slate-250">{page-1}</p>}
            {page !== 0 && <p className="font-extralight text-slate-250">{page}</p>}

            <p className="text-xl">{page + 1}</p>
            {page !==9 && <p className="font-extralight text-slate-250">{page+2}</p>}
            {page < 8 && <p className="font-extralight text-slate-250">{page+3}</p>}
              <button
                className="rounded-md py-1 px-2"
                onClick={() => setPage(page + 1)}
                disabled={page === 9}
              >
                {'>'}
              </button>
            </div>
          </div>
        </Card>
      )}
    </main>
  );
}
