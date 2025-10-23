fn main() {
    let tracer = trace().unwrap();
    let registry = tracer.registry().unwrap();

    let code = registry
        .into_iter()
        .enumerate()
        .map(|(_index, (name, format))| match format {
            serde_reflection::ContainerFormat::Enum(map) => {
                let is_unit = map.iter().all(|(_index, item)| {
                    matches!(item.value, serde_reflection::VariantFormat::Unit)
                });
                if is_unit {
                    let variants = map
                        .into_iter()
                        .map(|(index, field)| format!("{} = {index},", field.name))
                        .collect::<Vec<_>>()
                        .join("\n\t");
                    format!("export enum {name} {{\n\t{variants}\n}}",)
                } else {
                    let variants = map
                        .into_iter()
                        .map(|(_index, field)| {
                            format!(
                                "| {{ \"{}\": {} }}",
                                field.name,
                                match field.value {
                                    serde_reflection::VariantFormat::Variable(_) => unreachable!(),
                                    serde_reflection::VariantFormat::Unit =>
                                        return format!("| \"{}\"", field.name),
                                    serde_reflection::VariantFormat::NewType(item) =>
                                        convert_format(*item).to_string(),
                                    serde_reflection::VariantFormat::Tuple(items) => {
                                        let items = items
                                            .into_iter()
                                            .map(|item| convert_format(item).to_string())
                                            .collect::<Vec<_>>()
                                            .join(", ");
                                        format!("[{items},]")
                                    }
                                    serde_reflection::VariantFormat::Struct(fields) => {
                                        let fields = fields
                                            .into_iter()
                                            .map(|field| {
                                                format!(
                                                    "{}: {}",
                                                    field.name,
                                                    convert_format(field.value)
                                                )
                                            })
                                            .collect::<Vec<_>>()
                                            .join(", ");
                                        format!("{{ {fields} }}")
                                    }
                                }
                            )
                        })
                        .collect::<Vec<_>>()
                        .join("\n\t");
                    format!("export type {name} =\n\t{variants}")
                }
            }
            serde_reflection::ContainerFormat::Struct(vec) => {
                let fields = vec
                    .into_iter()
                    .map(|field| format!("{}: {};", field.name, convert_format(field.value)))
                    .collect::<Vec<_>>()
                    .join("\n\t");
                format!("export interface {name} {{\n\t{fields}\n}}")
            }
            x => todo!("{:#?}", x),
        })
        .map(|x| format!("{x}\n"))
        .collect::<Vec<_>>()
        .join("\n");

    let message = format!(
        r"
            // Automatically generated file, do not edit (changes made will be overwritten).
            // Created by <lcf-js>/rust/src/main.rs on {}.
        ",
        chrono::offset::Utc::now(),
    );
    let output = format!("{}\n{}", unindent::unindent(&message), code);
    std::fs::write("src/generated.d.ts", output).unwrap();
}

fn trace() -> Result<serde_reflection::Tracer, serde_reflection::Error> {
    let mut tracer = serde_reflection::Tracer::new(serde_reflection::TracerConfig::default());
    tracer.trace_simple_type::<lcf::Lcf>().unwrap();
    tracer.trace_simple_type::<lcf::enums::AnimationType>()?;
    tracer.trace_simple_type::<lcf::enums::Direction>()?;
    tracer.trace_simple_type::<lcf::enums::Priority>()?;
    tracer.trace_simple_type::<lcf::enums::ScrollType>()?;
    tracer.trace_simple_type::<lcf::enums::Speed>()?;
    tracer.trace_simple_type::<lcf::enums::Trigger>()?;
    tracer.trace_simple_type::<lcf::raw::lmu::event::instruction::Instruction>()?;
    tracer.trace_simple_type::<lcf::lmt::MapType>()?;
    tracer.trace_simple_type::<lcf::lmt::Setting>()?;
    Ok(tracer)
}

fn convert_format(format: serde_reflection::Format) -> String {
    match format {
        serde_reflection::Format::Variable(_) => unreachable!(),
        serde_reflection::Format::TypeName(name) => name,
        serde_reflection::Format::Unit => todo!(),
        serde_reflection::Format::Bool => "boolean".to_string(),
        serde_reflection::Format::I8
        | serde_reflection::Format::I16
        | serde_reflection::Format::I32
        | serde_reflection::Format::I64
        | serde_reflection::Format::I128
        | serde_reflection::Format::U8
        | serde_reflection::Format::U16
        | serde_reflection::Format::U32
        | serde_reflection::Format::U64
        | serde_reflection::Format::U128
        | serde_reflection::Format::F32
        | serde_reflection::Format::F64
        | serde_reflection::Format::Char => "number".to_string(),
        serde_reflection::Format::Str => "string".to_string(),
        serde_reflection::Format::Bytes => "Uint8Array".to_string(),
        serde_reflection::Format::Option(format) => {
            format!("{} | undefined", convert_format(*format))
        }
        serde_reflection::Format::Seq(format) => format!("{}[]", convert_format(*format)),
        serde_reflection::Format::Map { key, value } => todo!("map({key:?}, {value:?})"),
        serde_reflection::Format::Tuple(formats) => {
            let types = formats
                .into_iter()
                .map(|format| convert_format(format))
                .collect::<Vec<_>>()
                .join(", ");
            format!("[{types}]")
        }
        serde_reflection::Format::TupleArray { content, size } => {
            todo!("tuple array: {content:?}, {size}")
        }
    }
}
