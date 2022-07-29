import { useCallback, useRef } from "react";
import { FormHandles } from "@unform/core";

const useForm = () => {
  const formRef = useRef<FormHandles>(null);
  const isSaveAndNew = useRef(false);
  const isSaveAndBack = useRef(false);

  const save = useCallback((): void => {
    isSaveAndBack.current = false;
    isSaveAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const saveAndNew = useCallback((): void => {
    isSaveAndBack.current = false;
    isSaveAndNew.current = true;
    formRef.current?.submitForm();
  }, []);

  const saveAndBack = useCallback((): void => {
    isSaveAndBack.current = true;
    isSaveAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const getIsSaveAndBack = useCallback(() => isSaveAndBack.current, []);
  const getIsSaveAndNew = useCallback(() => isSaveAndNew.current, []);

  return {
    formRef,
    save,
    saveAndNew,
    saveAndBack,
    getIsSaveAndBack,
    getIsSaveAndNew,
  };
};

export { useForm };
