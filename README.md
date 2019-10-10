## Table of Contents

- [Demo](#demo)

## Если что то не так с ... :

### route (не обновляет) то посмотри ProtectRoute и можешь добавить

> pay attention of

```
export default connect(
  state => ({
    auth: state[moduleName]
  }),
  null,
  null,
  { pure: false }
)(PrivateRoute);
```

# Для чего

- Если ты хочешь реализовать проект который ни разу не реализовывал, то можешь связаться с братом кто уже реализовывал подобный проект и скоорденироваться для совместной реализации или спросить совет, узнать как он реализовал

- Для того чтоб координоваться в совместные проекты

- Для сохранности видения чем занимаются братья, мотивации к своим действиям

- Для совета в определенном решении

- Для совместных действий в определенной стране, определенном месте (фильтр локации)

## For developer

Для безопастности чужих данных, брат может выставить не локация "Россия" а локация "Могу помочь решить вопрос в 'Россия'", и тогда в учете поиска его можно показать и его локация останеться более сохраненней, тк он может проживать в Турции но иметь много друзей в РФ кто сможет посодействовать, т.е он может решать вопрос в нескольких странах. Или например по городам

# Структура пользователя

- name
- nickname // for hidden naturale name
- number // for search in WhatsApp, and invite in group in Telegramm **\***
- createdAt // for filter of search
- dateBirth // for filter of search by age's category
- faculty // for include specific task
- country // for search person who can realize some task in specific country in specific city
- city
- interests // for search brothers who has the same interests

# FootNote

## \*

Solve specific tasks will be in Telegramm group, therefore system pretend added user who have telephone number, or admin will add manually

# Планы, размышления

Если пользователь должен регестрироваться сам, по ссылке которую ему дают, то при потере аккаунта google or facebook
need allow off chance when user lost his account (gl, fb)
