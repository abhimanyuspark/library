import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Input, validation } from '../../components';
import { updateMyAlbums } from '../../redux/server/server';
import { v4 as uuidv4 } from 'uuid';

const AddMyAlbums = ({ id, setOpen }) => {
    const [formData, setFormData] = useState({
      id: uuidv4(),
      title: "",
      data: [],
    });
    const [formError, setFormError] = useState({
      title: "",
    });
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    const handleChange = (key, value) => {
      setFormData((p) => ({ ...p, [key]: value }));
      setFormError((p) => ({ ...p, [key]: "" }));
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      const validError = validation(formData);
      const isValid = Object.keys(validError).length === 0;
  
      if (isValid) {
        setOpen(false);
  
        const response = await dispatch(
          updateMyAlbums({ id, album: formData, action: "add" })
        );
  
        // setOpen(false);
  
        if (response?.meta?.requestStatus === "fulfilled") {
          toast.success(formData?.title + " Album created successfully", {
            theme: "colored",
          });
        } else {
          setFormError((p) => ({ ...p, ...response?.payload }));
        }
      } else {
        setFormError((p) => ({ ...p, ...validError }));
      }
    };
  
    return (
      <form onSubmit={onSubmit} className="flex-1 flex gap-4 flex-col">
        <Input
          label={"Title"}
          value={formData.title}
          error={formError.title}
          onChange={(e) => handleChange("title", e)}
        />
        <Button children="Add" loading={loading} />
      </form>
    );
  };

export default AddMyAlbums
