import { Button, Input } from "@vendure/dashboard";
import { useLingui } from "@lingui/react/macro";
import { Trash2 } from "lucide-react";
import { Controller, type Path, type UseFormReturn } from "react-hook-form";

import { BannerFormValues } from "../../helpers/types";
import { BannerRichTextEditor } from "../BannerRichTextEditor/BannerRichTextEditor";
import { ColorPicker } from "../ColorPicker/ColorPicker";
import { DatePicker } from "../DatePicker/DatePicker";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import "./BannerForm.scss";

type BannerFormProps = {
  form: UseFormReturn<BannerFormValues>;
  isCreating: boolean;
  isPending: boolean;
  onCancel: () => void;
};

const getPlainText = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent ?? "";
};

export function BannerForm({ form, isCreating, isPending, onCancel }: BannerFormProps) {
  const { control, watch, setValue } = form;
  const { t } = useLingui();

  const showActionButton = watch("showActionButton");
  const showCountdown = watch("showCountdown");
  const showNewsletter = watch("showNewsletter");
  const isClosable = watch("isClosable");
  const backgroundColorHex = watch("backgroundColorHex");

  const renderColorRow = (label: string, name: Path<BannerFormValues>) => (
    <div className="banner-form__row">
      <label className="banner-form__label">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="banner-form__color-row">
            {field.value && (
              <button
                type="button"
                className="banner-form__clear-button"
                onClick={() => field.onChange("")}
              >
                <Trash2 size={14} />
              </button>
            )}
            <ColorPicker color={(field.value as string) || ""} onChange={field.onChange} />
          </div>
        )}
      />
    </div>
  );

  const renderToggleRow = (label: string, name: Path<BannerFormValues>) => (
    <div className="banner-form__toggle-row">
      <label className="banner-form__label">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ToggleSwitch active={!!field.value} onToggle={field.onChange} />
        )}
      />
    </div>
  );

  return (
    <div className="banner-form">
      <div className="banner-form__action-bar">
        <Controller
          control={control}
          name="active"
          render={({ field }) => (
            <div className="banner-form__status">
              <ToggleSwitch active={!!field.value} onToggle={field.onChange} />
              <span>{field.value ? t`Enabled` : t`Disabled`}</span>
            </div>
          )}
        />
        <div className="banner-form__actions">
          <Button type="button" variant="outline" onClick={onCancel}>
            {isCreating ? t`Discard` : t`Cancel`}
          </Button>
          <Button type="submit" disabled={!form.formState.isDirty || isPending}>
            {isCreating ? t`Create` : t`Save`}
          </Button>
        </div>
      </div>

      <section className="banner-form__section">
        <div className="banner-form__field">
          <label className="banner-form__label">{t`Name`} *</label>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input {...field} placeholder={t`Banner name`} />
            )}
          />
        </div>

        <div className="banner-form__grid">
          <div className="banner-form__field">
            <label className="banner-form__label">{t`Start date`} *</label>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  maxDate={watch("endDate")}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="banner-form__field">
            <label className="banner-form__label">{t`End date`} *</label>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  minDate={watch("startDate")}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="banner-form__field">
          <label className="banner-form__label">{t`Description`}</label>
          <Controller
            control={control}
            name="descriptionHtml"
            render={({ field }) => (
              <BannerRichTextEditor
                value={field.value ?? ""}
                onChange={html => {
                  field.onChange(html);
                  setValue("description", getPlainText(html), { shouldDirty: true });
                }}
                backgroundColor={backgroundColorHex || undefined}
              />
            )}
          />
        </div>

        {renderColorRow(t`Background color`, "backgroundColorHex")}
        {renderToggleRow(t`Closable`, "isClosable")}
        {isClosable && renderColorRow(t`Close button color`, "closeButtonColorHex")}
      </section>

      <section className="banner-form__section">
        {renderToggleRow(t`Show action button`, "showActionButton")}

        {showActionButton && (
          <>
            <div className="banner-form__field">
              <label className="banner-form__label">{t`Text`}</label>
              <Controller
                control={control}
                name="actionButtonLabel"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? ""} />
                )}
              />
            </div>

            <div className="banner-form__field">
              <label className="banner-form__label">{t`URL`}</label>
              <Controller
                control={control}
                name="actionButtonUrl"
                render={({ field }) => (
                  <Input {...field} value={field.value ?? ""} />
                )}
              />
            </div>

            {renderColorRow(t`Background color`, "actionButtonBackgroundColorHex")}
            {renderColorRow(t`Text color`, "actionButtonFontColorHex")}
          </>
        )}
      </section>

      <section className="banner-form__section">
        {renderToggleRow(t`Show countdown`, "showCountdown")}

        {showCountdown && (
          <>
            {renderColorRow(t`Background color`, "countdownButtonBackgroundColorHex")}
            {renderColorRow(t`Text color`, "countdownButtonFontColorHex")}
          </>
        )}
      </section>

      <section className="banner-form__section">
        {renderToggleRow(t`Show newsletter button`, "showNewsletter")}

        {showNewsletter && (
          <>
            {renderColorRow(t`Background color`, "newsletterButtonBackgroundColorHex")}
            {renderColorRow(t`Text color`, "newsletterButtonFontColorHex")}
          </>
        )}
      </section>
    </div>
  );
}
