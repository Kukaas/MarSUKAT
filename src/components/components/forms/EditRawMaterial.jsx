import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EditRawMAterialsSchema } from "@/schema/shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const EditRawMaterial = ({ selectedRawMaterial }) => {
  const [editRawMaterialLoading, setEditRawMaterialLoading] = useState(false);

  const editRawMaterialForm = useForm({
    resolver: zodResolver(EditRawMAterialsSchema),
    defaultValues: {
      type: selectedRawMaterial?.type,
      quantity: selectedRawMaterial?.quantity,
      unit: selectedRawMaterial?.unit,
    },
  });

  const handleEditRawMaterial = async (values) => {
    try {
      setEditRawMaterialLoading(true);
      const res = await axios.put(
        `https://marsu.cut.server.kukaas.tech/api/v1/raw-materials/update/${selectedRawMaterial._id}`,
        values
      );

      if (res.status === 200) {
        setEditRawMaterialLoading(false);
        toast.success("Raw material updated", {
          action: {
            label: "Ok",
          },
        });
        editRawMaterialForm.reset();
      }
    } catch (error) {
      setEditRawMaterialLoading(false);
      toast.error("Uh oh! Something went wrong");
    }
  };

  return (
    <Form {...editRawMaterialForm}>
      <form
        onSubmit={editRawMaterialForm.handleSubmit(handleEditRawMaterial)}
        className="space-y-4 w-full p-3"
      >
        <FormField
          control={editRawMaterialForm.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={editRawMaterialForm.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={editRawMaterialForm.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value !== undefined ? field.value : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value !== "" ? parseFloat(value) : "");
                  }}
                  placeholder="Quantity"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2">
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">
            {editRawMaterialLoading ? (
              <span className="loading-dots">Updating</span>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

EditRawMaterial.propTypes = {
  selectedRawMaterial: PropTypes.object,
};

export default EditRawMaterial;