import { vi } from 'vitest';
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCart from "./ProductCart";

// Función auxiliar: dibuja la tarjeta con datos de ejemplo.
// "overrides" permite cambiar solo lo que cada prueba necesite.
function renderRow(overrides = {}) {
    const props = {
        name: "Camisa",
        price: 10,
        image: "camisa.png",
        quantity: 2,
        onAddClick: vi.fn(),
        onSubsClick: vi.fn(),
        onQuantityChange: vi.fn(),
        onRemoveClicked: vi.fn(), // función espía: registra si la llamaron y con qué
        ...overrides,
    };
    render(<ProductCart {...props} />);
    return props;               // devuelvo las props para poder revisar el espía
    }

describe("ProductCart", () => {
    it("muestra el nombre y el precio", () => {
        renderRow();
        expect(screen.getByText("Camisa")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toHaveValue("2")
    });

    it("+ avisa que se quiere sumar", async () => {
        const user = userEvent.setup();
        const { onAddClick } = renderRow();
        await user.click(screen.getByRole("button", { name: "+" }));
        expect(onAddClick).toHaveBeenCalledTimes(1);
    });

    it("- avisa que se quiere restar", async () => {
        const user = userEvent.setup();
        const { onSubsClick } = renderRow();
        await user.click(screen.getByRole("button", { name: "-" }));
        expect(onSubsClick).toHaveBeenCalledTimes(1);
    });

    it("Remove avisa que se quiere quitar", async () => {
        const user = userEvent.setup();
        const { onRemoveClicked } = renderRow();
        await user.click(screen.getByRole("button", { name: /remove/i }));
        expect(onRemoveClicked).toHaveBeenCalledTimes(1);
    });

    it("escribir en el input avisa con el nuevo valor", () => {
        const { onQuantityChange } = renderRow();
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "5" } });
        expect(onQuantityChange).toHaveBeenCalledWith("5");
    });
});