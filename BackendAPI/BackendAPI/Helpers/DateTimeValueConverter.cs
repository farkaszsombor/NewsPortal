using AutoMapper;
using System;

namespace BackendAPI.Helpers
{
    public class DateTimeValueConverter : IValueConverter<DateTime, string>
    {
        public string Convert(DateTime sourceMember, ResolutionContext context)
        {
            return sourceMember.ToString("F");
        }
    }
}
